from django.urls import path
from .views import Allbook, Login,Signup, Xoa, Sua, Them, Comments,PostRatingAndComment,BillOrder, Bookid, Giaima, AllUser, Allcategory, SuaCategory, Themcategory, Xoacategory, Boughted, Userid, BoughtAC, HuyDon, search

urlpatterns = [
    path('allbook',Allbook.as_view()),
    path('alluser',AllUser.as_view()),
    path('allcategory',Allcategory.as_view()),
    path('book/<int:id>',Bookid.as_view()),
    path('suacategory/<int:id>',SuaCategory.as_view()),
    path('xoacategory/<int:id>',Xoacategory.as_view()),
    path('themcategory',Themcategory.as_view()),
    path('login', Login.as_view()),
    path('signup',Signup.as_view()),
    path('giaima',Giaima.as_view()),
    path('delete/<int:id>',Xoa.as_view()),
    path('update/<int:id>',Sua.as_view()),
    path('add',Them.as_view()),
    path('comment/<int:id>',Comments.as_view()),
    path('PostRatingAndComment/<int:id>',PostRatingAndComment.as_view()),
    path('Bill',BillOrder.as_view()),
    path('Bought',Boughted.as_view()),
    path('userid',Userid.as_view()),
    path('BoughtAc',BoughtAC.as_view()),
    path('huydon/<int:id>',HuyDon.as_view()),
    path('search/<str:ten>',search.as_view()),
]   