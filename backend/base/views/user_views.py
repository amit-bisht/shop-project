from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from base.serializers import UserSerializer,UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status



@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        print(data)
        user=User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
        )
        print(user)
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'user with this name already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


   

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(reqeust):
    user=User.objects.all()
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["username"]=str(self.user.username)
        data['email']=str(self.user.email)
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer