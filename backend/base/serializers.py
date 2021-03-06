from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from . models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields="__all__"
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","is_staff"]

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=["id","username","email","is_staff","token"]

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token)