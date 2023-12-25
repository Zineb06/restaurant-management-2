@extends('reservations.layout')
@section('content')
 
<div class="card">
  <div class="card-header">Add Reservation</div>
  <div class="card-body">
      
      <form action="{{ url('reservations') }}" method="post">
        {!! csrf_field() !!}

        <label>IdClient</label></br>
        <!-- <input type="text" name="idClient" id="idClient" class="form-control"></br> -->
        <select data-mdb-select-init data-mdb-filter="true" class="form-control"  name="idClient" id="idClient" >
            <option value="" disabled selected>Select Client ID</option>
            @foreach($clients as $item)
                <option value ="{{ $item->id }}">{{ $item->id }} ({{ $item->prenom }} {{ $item->nom }}) </option>
            @endforeach 
        </select></br>

        <label>Date</label></br>
        <input type="date" name="date" id="date" class="form-control"></br>

        <label>Time</label></br>
        <!-- <input type="text" name="time" id="time" class="form-control"></br> -->
        <select data-mdb-select-init data-mdb-filter="true" class="form-control" name="time" id="time"></br>
          <option value="" disabled selected>Select Time</option>
          <option value="8:00">8:00</option>
          <option value="9:00">9:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
        </select></br>
        
        <label>Table Number </label></br>
        <!-- <input type="text" name="NumTable" id="NumTable" class="form-control"></br> -->
        <select data-mdb-select-init data-mdb-filter="true" class="form-control" name="NumTable" id="NumTable" ></br>
        <option value="" disabled selected>Select Table Number</option>
        @foreach($tables as $item)
            <option value = "{{ $item->idTable }}">{{ $item->idTable }} ({{ $item->guests }} max)</option>
            @endforeach
        </select></br>
        
        <label>Guests Number</label> </label></br>
        <!-- <input type="text" name="GuestsNumber" id="GuestsNumber" class="form-control"></br> -->
        <select data-mdb-select-init data-mdb-filter="true" class="form-control" name="GuestsNumber" id="GuestsNumber" ></br>
          <option value="" disabled selected>Select Number of Guests</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select></br>

        
        <label>Status </label></br>
        <!-- <input type="text" name="status" id="status" class="form-control"></br> -->
        <select data-mdb-select-init data-mdb-filter="true" class="form-control"  name="status" id="status" ></br>
          <option value="" disabled selected>Select Number of Guests</option>
          <option value="reserved">reserved</option>
          <option value="canceled">canceled</option>
          <option value="pending">pending</option>
        </select></br>

        <input type="submit" value="Save" class="btn btn-success"></br>
    </form>
  </div>
</div>
 
@stop
