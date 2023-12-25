@extends('menus.layout')
@section('content')
 
<div class="card">
  <div class="card-header">Edit Menu</div>
  <div class="card-body">
      
      <form action="{{ url('menus/' .$menu->idMenu) }}" method="post" enctype="multipart/form-data">
        {!! csrf_field() !!}
        @method("PATCH")
        <input type="hidden" name="idMenu" value="{{$menu->idMenu}}" id="idMenu" />
        
        <label>Category </label></br>
        <select data-mdb-select-init data-mdb-filter="true" value="{{$menu->category}}"  class="form-control" name="category" id="category" ></br>
          <option>Normal</option>
          <option>Special</option>
        </select></br>

        <label>Dish Name</label></br>
        <input type="text" name="Dish" id="Dish" value="{{$menu->dish}}" class="form-control"></br>
        <label> Price </label></br>
        <input type="text" name="Price" id="Price" value="{{$menu->price}}" class="form-control"></br>

        <label>Image</label></br>
        <input type="file" name="image" id="image" value="{{$menu->image}}" class="form-control"></br>

        <input type="submit" value="update" class="btn btn-success"></br>
    </form>
   
  </div>
</div>
 
@stop