from rest_framework import serializers
from products.models import Item, Cart
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



'''
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    
    def get(self, request):
        user = request.user
        return user 
'''
    
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        lookup_field = 'slug'

        # if you want to show the links field in the response
        extra_kwargs = {'url': {'lookup_field':'slug'}}

class CartSerializer(serializers.ModelSerializer):
    #item = serializers.CharField(required=False)
    #user = serializers.CharField(required=False)
    #itemd = serializers.SerializerMethodField('get_item')
    item = ItemSerializer()
    #user = request.user
    

    class Meta:
        model = Cart
        fields = ('id','user','item','qty')
        #fields = '__all__'
        #read_only_fields = ['user', 'item']

    



