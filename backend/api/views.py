from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Discovery
from .serializers import DiscoverySerializer


import json


def home_view(request):
    return JsonResponse({"message": "Welcome to EcoCache backend!"})

@csrf_exempt
def register_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if not all([username, email, password]):
                return JsonResponse({"message": "Missing fields"}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"message": "Username already exists"}, status=400)

            User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({"message": "Registration successful!"})
        except Exception as e:
            return JsonResponse({"message": f"Error: {str(e)}"}, status=500)

    return JsonResponse({"message": "Only POST method allowed"}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({"message": "Login successful!"}, status=200)
            else:
                return JsonResponse({"message": "Invalid credentials."}, status=401)
        except Exception as e:
            return JsonResponse({"message": f"Error: {str(e)}"}, status=500)

    return JsonResponse({"message": "Only POST method allowed"}, status=405)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info_view(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_discovery(request):
    title = request.data.get('title')
    content = request.data.get('content')
    image = request.FILES.get('image')

    if not title or not content:
        return Response({'message': 'Title and content required.'}, status=400)

    discovery = Discovery.objects.create(
        user=request.user,
        title=title,
        content=content,
        image=image
    )

    return Response({'message': 'Discovery created successfully!'})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_discoveries(request):
    user = request.user
    discoveries = Discovery.objects.filter(user=user).order_by("-created_at")
    serializer = DiscoverySerializer(discoveries, many=True, context={"request": request})
    return Response(serializer.data)