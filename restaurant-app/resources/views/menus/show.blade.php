@extends('menus.layout')
@section('content')

<div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card bg-dark text-white" style="width: 24rem;">
        <div class="card-header bg-dark"><center><h4>Dish Informations</h4></center></div>
        <div class="card-body">
            <!-- <h5 class="card-title"><center>ID: {{ $menu->idMenu }}</center></h5> -->
            <p class="card-text">
                <center><img src="{{ asset($menu->image) }}" alt="image" width="170" height="170" class="img img-responsive rounded-circle" /></center>
            </p>
            <center>
            <p class="card-text"><b>Category:</b> {{ $menu->category }}</p>
            <p class="card-text"><b>Dish Name:</b> {{ $menu->dish }}</p>
            <p class="card-text"><b>Price:</b> {{ $menu->price }}</p>
            </center>
        </div>
    </div>
</div>

@endsection
