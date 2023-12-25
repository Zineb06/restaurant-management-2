@extends('menus.layout')
@section('content')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js"></script> -->

<div class="card">
  <div class="card-header">Add Menu</div>
  <div class="card-body">
      
      <form action="{{ url('menus') }}" method="post" enctype="multipart/form-data">
        {!! csrf_field() !!}
        <!-- <label>ID Menu </label></br>
        <input type="text" name="idMenu" id="idMenu" class="form-control"></br>
       -->
        <label>Category</label></br>
        <!-- <input type="text" name="category" id="category" class="form-control"></br> -->
        <select data-mdb-select-init data-mdb-filter="true" class="form-control" name="category" id="category" ></br>
          <option value="" disabled selected>Select Category</option>
          <option>Normal</option>
          <option>Special</option>
        </select></br>

        <label>Dish Name </label> </label></br>
        <input type="text" name="dish" id="dish" class="form-control"></br>
        <label>Price  </label> </label></br>
        <input type="text" name="price" id="price" class="form-control"></br>
        
        <label>Image</label></br>
        <input type="file" name="image" id="image" class="form-control"></br>

        <input type="submit" value="Save" class="btn btn-success"></br>
    </form>
  </div>
</div>



<script>
  var i=0;
  $('#add').click(function(){
      ++i;
      $('#table').append(
        `<tr>
            <td>
                <input type="text" name="inputs[`+i+`][dishGroupName]" id="dishGroupName" class="form-control">
            </td>
            <td>
                <button type="button" class="btn btn-danger remove-tr">Remove</button>
            </td>
          </tr>`);
  });
  $(document).on('click', '.remove-tr', function(){  
         $(this).parents('tr').remove();
    });

   
</script>

@stop
