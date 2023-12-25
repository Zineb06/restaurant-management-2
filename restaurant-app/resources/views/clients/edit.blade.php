@extends('clients.layout')
@section('content')
 
<div class="card">
  <div class="card-header">Edit Client</div>
  <div class="card-body">
      
      <form action="{{ url('clients/' .$client->id) }}" method="post">
        {!! csrf_field() !!}
        @method("PATCH")
        <input type="hidden" name="id" value="{{$client->id}}" id="id" />
        <label>First Name</label></br>
        <input type="text" name="prenom" id="prenom" value="{{$client->prenom}}" class="form-control"></br>
        <label>Last Name </label></br>
        <input type="text" name="nom" id="nom" value="{{$client->nom}}" class="form-control"></br>
        <label>Cin </label></br>
        <input type="text" name="cin" id="cin" value="{{$client->cin}}" class="form-control"></br>
        <label>Email</label></br>
        <input type="text" name="email" id="email" value="{{$client->email}}" class="form-control"></br>
        <label>Phone</label></br>
        <input type="text" name="phone" id="phone" value="{{$client->phone}}" class="form-control"></br>

        <input type="submit" value="update" class="btn btn-success"></br>
    </form>
    
  </div>
</div>
 
@stop