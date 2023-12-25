@extends('clients.layout')
@section('content')
  
<div class="card" style="margin:20px;">
  <div class="card-header">Clients Page</div>
  <div class="card-body">
        <div class="card-body">
        <h5 class="card-title">ID : {{ $client->id }}</h5>
        <p class="card-text">First Name : {{ $client->prenom }}</p>
        <p class="card-text">Last Name : {{ $client->nom }}</p>
        <p class="card-text">CIN : {{ $client->cin }}</p>
        <p class="card-text">Email : {{ $client->email }}</p>
        <p class="card-text">Phone : {{ $client->phone }}</p>
  </div>
    </hr>
  </div>
</div>
@endsection