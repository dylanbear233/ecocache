from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        return JsonResponse({"message": "Registration successful!"})
    return JsonResponse({"message": "Only POST method allowed"}, status=405)
