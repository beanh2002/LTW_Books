from rest_framework import serializers
from Entity.models.Book import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"