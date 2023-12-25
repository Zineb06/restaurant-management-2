@extends('clients.layout')
@section('content')
 
<div class="card">
  <div class="card-header">Add Client</div>
  <div class="card-body">
      
      <form action="{{ url('clients') }}" method="post">
        {!! csrf_field() !!}
        <label>First Name</label></br>
        <input type="text" name="prenom" id="prenom" class="form-control"></br>
        <label>Last Name</label></br>
        <input type="text" name="nom" id="nom" class="form-control"></br>
        <label>CIN</label></br>
        <input type="text" name="cin" id="cin" class="form-control"></br>
        <label>Email</label> </label></br>
        <input type="text" name="email" id="email" class="form-control"></br>
        <label>Phone </label></br>
        <input type="text" name="phone" id="phone" class="form-control"></br>
        <input type="submit" value="Save" class="btn btn-success"></br>
    </form>
  </div>
</div>
 
@stop
