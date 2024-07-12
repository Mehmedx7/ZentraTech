from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import RegistrationSerializer, LoginSerializer
from .models import *
from .serializers import *

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({'message': 'Login successful', 'username': user.username})
        return Response({'message': 'Invalid credentials'}, status=400)
    
class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
