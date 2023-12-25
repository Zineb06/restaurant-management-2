@extends('reservations.layout')
@section('content')
  
<div class="card" style="margin:20px;">
  <div class="card-header">Reservation Page</div>
  <div class="card-body">
        <div class="card-body">
        <h5 class="card-title">ID : {{ $reservations->idReservation }}</h5>
        <p class="card-text">ID Client : {{ $reservations->idClient }}</p>
        <p class="card-text">Date : {{ $reservations->date }}</p>
        <p class="card-text">Time : {{ $reservations->time }}</p>
          <p class="card-text">Table Number : {{ $reservations->NumTable }}</p>
        <p class="card-text">Guests Number : {{ $reservations->GuestsNumber }}</p>
        <p class="card-text">Status : {{ $reservations->Status }}</p>
  </div>
    </hr>
  </div>
</div>
@endsection