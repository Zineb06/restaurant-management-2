@extends('clients.layout')
@section('content')
    <div class="container">
        <div class="row"> 
 
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h2>Clients Management</h2>
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

                        <a href="{{ url('/clients/create') }}" class="btn btn-success btn-sm" title="Add New Client">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>
                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Prenom</th>
                                        <th>Nom</th>
                                        <th>CIN</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($client as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $item->prenom}}</td>
                                        <td>{{ $item->nom }}</td>
                                        <td>{{ $item->cin }}</td>
                                        <td>{{ $item->email}}</td>
                                        <td>{{ $item->phone}}</td>
                                        <td>
                                        <a href="{{ url('/clients/' . $item->id) }}" title="View Client"><button class="btn btn-info btn-sm"><i class="fa fa-eye" aria-hidden="true"></i> View</button></a>
                                            <a href="{{ url('/clients/' . $item->id . '/edit') }}" title="Edit Client"><button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></a>
 
                                            <form method="post" action="{{ url('/clients/' . $item->id) }}" accept-charset="UTF-8" style="display:inline">
                                            {{ method_field('DELETE') }}
                                            @csrf
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Client" onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
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