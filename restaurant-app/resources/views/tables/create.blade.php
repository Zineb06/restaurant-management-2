@extends('tables.layout')
@section('content')

<div class="card">
  <div class="card-header"> Add Table </div>
  <div class="card-body">
      
      <form action="{{ url('tables') }}" method="post">
        {!! csrf_field() !!}

        <label>ID table </label></br>
        <input type="text" name="idTable" id="idTable" class="form-control"></br>
      
        <label>Location :</label></br>
        <select data-mdb-select-init data-mdb-filter="true" class="form-control" name="location" id="location" ></br>
          <option value="" disabled selected>Select Location</option>
          <option>Inside</option>
          <option>Outside</option>
          <option>Front</option>
        </select></br>

        <label>Guests Number : </label> </br>
        <select data-mdb-select-init data-mdb-filter="true" class="form-control" name="guests" id="guests" ></br>
          <option value="" disabled selected>Select Max Guests Number</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select></br>
        
        <input type="submit" value="Save" class="btn btn-success"></br>
    </form>
  </div>
</div>

@stop
