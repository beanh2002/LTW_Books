from django.db import models
from django.core.exceptions import ValidationError
def validate_length_not_zero(value):
    if len(value.strip()) == 0:
        raise ValidationError("Độ dài chuỗi phải lớn hơn 0.")
class User(models.Model):
    UserName= models.CharField(max_length=225, validators=[validate_length_not_zero])
    Email = models.EmailField(unique=True, validators=[validate_length_not_zero])
    Password = models.CharField(max_length=255, validators=[validate_length_not_zero])
    FullName = models.CharField(max_length=225,null=True)
    
    