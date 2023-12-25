@extends('tables.layout')
@section('content')

<div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card" style="width: 24rem;">
        <div class="card-header"><center><h4>Table Informations</h4></center></div>
        <div class="card-body">
            <h5 class="card-title"><center>ID: {{ $table->idTable }}</center></h5>
            <center>
            <p class="card-text"><b>Location :</b> {{ $table->location }}</p>
            <p class="card-text"><b>Maximum Guests Nmber :</b> {{ $table->guests }}</p>
            </center>
        </div>
    </div>
</div>

@endsection
