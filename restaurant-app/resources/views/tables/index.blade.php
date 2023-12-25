@extends('tables.layout')
@section('content')
    <div class="container">
        <div class="row"> 

            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h2>tables Management</h2>
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
                        <a href="{{ url('/tables/create') }}" class="btn btn-success btn-sm" title="Add New table">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>
                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Location</th>
                                        <th>Guests</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($table as $item)
                                    <tr>
                                        <td>{{ $item->idTable }}</td>
                                        <td>{{ $item->location }}</td>
                                        <td>{{ $item->guests }}</td>
                                        <td>
                                        <a href="{{ url('/tables/' . $item->idTable) }}" title="View table"><button class="btn btn-info btn-sm"><i class="fa fa-eye" aria-hidden="true"></i> View</button></a>
                                            <a href="{{ url('/tables/' . $item->idTable . '/edit') }}" title="Edit table"><button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></a>

                                            <form method="post" action="{{ url('/tables/' . $item->idTable) }}" accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete table" onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
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