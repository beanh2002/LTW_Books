from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from Entity.models.Book import Book
from Entity.models.User import User
from Entity.models.Bill import Bill
from Entity.models.Role import Role
from Entity.models.Category import Category
from Entity.models.Comment import Comment
from Entity.models.Rate import Rate
from Entity.models.Bought import Bought
from Serializer.UserSerializer import UserByAdminSerializer
from datetime import datetime, timedelta, timezone
import jwt
from core.RoleDecorator import RoleRequest
import os
from core.settings import MEDIA_ROOT
from core.settings import BASE_DIR
from django.db.models import F
from django.db.models import Q



class Allbook(APIView):
    def get(self, request):
        books = Book.objects.all()
        booklist = []
        for book in books:
            booklist.append({"id":book.id, "BookName":book.BookName, "ContentBook":book.ContentBook, "PageNumber":book.PageNumber, "Price":book.Price, "BookImage":book.BookImage, "Author":book.Author,"Releasedate": book.Releasedate, "Category": book.Category.CategoryName})
        return Response(booklist, status=200)
    
class Bookid(APIView):
    def get(self, request, id):
        book = Book.objects.get(pk=id)
        bookList = {"id":book.id, "BookName":book.BookName, "ContentBook":book.ContentBook, "PageNumber":book.PageNumber, "Price":book.Price, "BookImage":book.BookImage, "Author":book.Author, "Category": book.Category.CategoryName}
        return Response(bookList, status=200)
    

class Login(APIView):
    def post(self, request):
        exp=datetime.now(tz=timezone.utc) + timedelta(minutes=50)
        if 'email' not in request.data:
            return Response({"massage":"nhap tk di"},status=400)
        Email = request.data['email']

        if 'password' not in request.data:
            return Response({"massage":"nhap mk di"},status=400)
        Password = request.data['password']

        try:
            user = User.objects.get(Email = Email, Password = Password)
            role = Role.objects.filter(roleuser__User=user)
            print(role)
            roleList = []
            for i in role:
                roleList.append(i.RoleName)
        except:
            return Response({"message":"sai tai khoan"}, status=400)
        encoded_jwt = jwt.encode({"userID": user.pk,"Roles":roleList,"exp":exp}, "ngoc", algorithm="HS256")
        return Response({"access__token":encoded_jwt},status=201)

class Signup(APIView):
    def post(self, request):
        userSerializer = UserByAdminSerializer(data=request.data)
        if userSerializer.is_valid():
            user=userSerializer.save()
            return Response(userSerializer.data,status=201)
        return Response(userSerializer.errors,status=400)
    
class Giaima(APIView):
    def get(self, request):
        return Response({"Roles":request.roles},status=200)
    
# book
class Xoa(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def delete(self, request, id):
        book = Book.objects.get(pk=id)
        book.delete()

        return Response({"message":"da xoa"}, status=200)

class Sua(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def patch(self, request, id):
        book = Book.objects.get(pk=id)
        Bookname = request.data['bookname']
        Releasedate = request.data['releasedate']
        Contentbook = request.data['contentbook']
        Pagenumber = request.data['pagenumber']
        Price = request.data['price']
        # Bookimage = request.data['bookimage']
        Bookimage = request.FILES.get('bookimage')

        if Bookimage:
            image_path = os.path.join(MEDIA_ROOT,Bookimage.name)[:-4]+'(0).png'
            check = 0
            while os.path.isfile(image_path):
                check+=1
                image_path = os.path.join(MEDIA_ROOT, Bookimage.name)[:-4]+'('+str(check)+').png'
            
            with open(image_path, 'wb') as f:
                for chunk in Bookimage.chunks():
                    f.write(chunk)
            Bookimage = image_path[len(os.path.join(BASE_DIR)):]
        
        Author = request.data['author']
        category = request.data['category']

        book.BookName = Bookname
        book.Releasedate = Releasedate
        book.ContentBook = Contentbook
        book.PageNumber = Pagenumber
        book.Price = Price
        book.BookImage = Bookimage
        book.Author = Author
        book.Category = Category.objects.get(pk=category)
        book.save()
        
        return Response({"message":'thanhcong'},status=201)

class Them(APIView):
    def post(self, request):
        Bookname = request.data['bookname']
        Releasedate = request.data['releasedate']
        Contentbook = request.data['contentbook']
        Pagenumber = request.data['pagenumber']
        Price = request.data['price']
        # Bookimage = request.data['bookimage']
        Bookimage = request.FILES.get('bookimage')

        if Bookimage:
            image_path = os.path.join(MEDIA_ROOT,Bookimage.name)[:-4]+'(0).png'
            check = 0
            while os.path.isfile(image_path):
                check+=1
                image_path = os.path.join(MEDIA_ROOT, Bookimage.name)[:-4]+'('+str(check)+').png'
            
            with open(image_path, 'wb') as f:
                for chunk in Bookimage.chunks():
                    f.write(chunk)
            Bookimage = image_path[len(os.path.join(BASE_DIR)):]
        
        Author = request.data['author']
        category = request.data['category']

        newBook = Book(BookName= Bookname, Releasedate= Releasedate, ContentBook= Contentbook, PageNumber= Pagenumber, Price= Price, BookImage= Bookimage, Author= Author, Category = Category.objects.get(pk=category))
        newBook.save()
        return Response({"message":"thanhcong"},status=200)

# user
class AllUser(APIView):
    def get(self, request):
        users = User.objects.all()
        userlist = []
        for user in users:
            userlist.append({"id":user.pk,"username":user.UserName, "email":user.Email})
        return Response(userlist, status=200)
    
class Userid(APIView):
    def get(self, request):
        user = User.objects.get(pk = request.userID)
        userlist = {"id":user.pk,"username":user.UserName, "email":user.Email}
        return Response(userlist, status=200)
    
# category

class Allcategory(APIView):
    def get(self, request):
        categorys = Category.objects.all()
        categoryList = []
        for category in categorys:
            categoryList.append({"id":category.pk, "categoryname":category.CategoryName})
        return Response(categoryList, status=200)
    
class SuaCategory(APIView):
    def patch(self, request, id):
        category = Category.objects.get(pk=id)
        cate = request.data['category']
        category.CategoryName = cate
        category.save()
        return Response({"message":"thanhcong"}, status=200)
    
class Themcategory(APIView):
    def post(self, request):
        cate = request.data['category']
        newCategory = Category(CategoryName = cate)
        newCategory.save()
        return Response({"message":"thanhcong"}, status=200)
    
class Xoacategory(APIView):
    def delete(self, request, id):
        category = Category.objects.get(pk=id)
        category.delete()
        return Response({"message":"daxoa"}, status=200)



class Comments(APIView):
    def get(self, request, id):
        comments = Comment.objects.filter(Book__pk=id)
        commentList = []
        for com in comments:
            a=Rate.objects.filter(User = com.User, Book__pk=id)[0]
            commentList.append({"name":com.User.UserName, "comment":com.Comment, "rate":a.Rate})
        return Response(commentList, status=200)
    

class PostRatingAndComment(APIView):
    def post(self,request,id):
        user = User.objects.get(pk=request.userID)
        bought= Bought.objects.filter(User=user,StatusBuy='InBill')
        if len(bought)==0:
            return Response({"massage":"Bạn chưa mua sản phẩm"},status=400)
        rate = request.data['Rate']
        comment = request.data['Comment']
        book =Book.objects.get(pk=id)
        newRate = Rate(Book=book,User=user,Rate=rate)
        newComment = Comment(Comment=comment,User=user,Book=book)
        newRate.save()
        newComment.save()
        return Response({"message":"thành công"},status=201)
    
class BillOrder(APIView):
    def post(self,request):
        boughtes= request.data['boughtes']
        newBill = Bill(StatusBill='Đang giao hàng',DeliveryDestination=datetime.now())
        newBill.save()
        for bought in boughtes:
            boughted= Bought.objects.get(pk=bought)
            boughted.StatusBuy='InBill'
            boughted.Bill=newBill
            boughted.save()
        return Response({"message":"thành công"},status=201)
    

class Boughted(APIView):
    def post(self, request):
        user = User.objects.get(pk=request.userID)

        newBill = Bill(StatusBill='Đang mua', DeliveryTime = datetime.now(tz=timezone.utc) + timedelta(days=2))
        newBill.save()
        for i in request.data:
            newBought = Bought(User= user, Book=Book.objects.get(pk = i['id']), Quantity= i['qty'], PurchasedPrice= i['Price'], StatusBuy='InBill',Bill=newBill)
            newBought.save()
        return Response({"message":"thành công"},status=201)

class BoughtAC(APIView):
    def get(self,request):
        book = Bought.objects.filter(User_id = request.userID).annotate(
            username = F('User__UserName'),
            bookname = F('Book__BookName'),
            quantity = F('Quantity'),
            purchasedprice = F('PurchasedPrice'),
            statusbuy = F('StatusBuy'),
            billid = F('Bill__pk')
        ).values('username', 'bookname', 'quantity', 'purchasedprice', 'statusbuy', 'billid').order_by('-id')

        bookList = list(book)
        return Response(bookList, status=200)
    
class HuyDon(APIView):
    def delete(self, request, id):
        bill = Bill.objects.get(pk = id)
        bill.delete()
        return Response({"message":"daxoa"}, status=200)
        
class search(APIView):
    def get(self, request, ten):
        book = Book.objects.filter(Q(BookName__icontains = ten))
        bookList = []
        for book in book:
            bookList.append({"id":book.id, "BookName":book.BookName, "ContentBook":book.ContentBook, "PageNumber":book.PageNumber, "Price":book.Price, "BookImage":book.BookImage, "Author":book.Author,"Releasedate": book.Releasedate, "Category": book.Category.CategoryName})
        return Response(bookList, status=200)