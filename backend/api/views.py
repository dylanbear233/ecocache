from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
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