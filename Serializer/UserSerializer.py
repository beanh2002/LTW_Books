from rest_framework import serializers
from Entity.models.User import User

class UserByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    def validate_UserName(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError("Độ dài chuỗi phải lớn hơn 0.")
        return value