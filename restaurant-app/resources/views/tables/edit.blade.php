@extends('tables.layout')
@section('content')
 
<div class="card">
  <div class="card-header">Edit table</div>
  <div class="card-body">
      
      <form action="{{ url('tables/' .$table->idTable) }}" method="post" enctype="multipart/form-data">

        {!! csrf_field() !!}
        @method("PATCH")

        <input type="hidden" name="idTable" value="{{$table->idTable}}" id="idTable" />
        
        <label>Location </label></br>
        <input type="text" name="location" id="location"  value="{{$table->location}}" class="form-control"></br>
        <label> Guests Number  </label></br>
        <input type="text" name="guests" id="guests" value="{{$table->guests}}" class="form-control"></br>

        <input type="submit" value="update" class="btn btn-success"></br>
    </form>
   
  </div>
</div>
 
@stop