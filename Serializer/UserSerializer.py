from rest_framework import serializers
from Entity.models.User import User

class UserByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"