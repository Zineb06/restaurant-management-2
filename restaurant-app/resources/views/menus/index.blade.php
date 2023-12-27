@extends('menus.layout')
@section('content')
    <div class="container">
        <div class="row"> 
 
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h2>Menus Management</h2>
                    </div>
                    <div class="card-body">
                    @if (session('add_message'))
                            <div class="alert alert-success">
                                {{ session('add_message') }}
                            </div>
                        @endif
                        @if (session('update_message'))
                            <div class="alert alert-warning">
                                {{ session('update_message') }}
                            </div>
                        @endif
                        @if (session('delete_message'))
                            <div class="alert alert-danger">
                                {{ session('delete_message') }}
                            </div>
                        @endif
                        <a href="{{ url('/menus/create') }}" class="btn btn-success btn-sm" title="Add New menu">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>
                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Category</th>
                                        <th>Dish</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($menu as $item)
                                    <tr>
                                        <td>{{ $item->idMenu }}</td>
                                        <td>
                                            <img src="{{ asset($item->image) }}" alt="image" width="60" height="60" class="img img-responsive rounded-circle "/>

                                        </td>
                                        <td>{{ $item->image }}</td>
                                        <td>{{ $item->dish }}</td>
                                        <td>{{ $item->price }}</td>
                                        <td>
                                        <a href="{{ url('/menus/' . $item->idMenu) }}" title="View Menu"><button class="btn btn-info btn-sm"><i class="fa fa-eye" aria-hidden="true"></i> View</button></a>
                                            <a href="{{ url('/menus/' . $item->idMenu . '/edit') }}" title="Edit Menu"><button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></a>
 
                                            <form method="post" action="{{ url('/menus/' . $item->idMenu) }}" accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Menu" onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
 
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection