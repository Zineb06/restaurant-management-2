@extends('reservations.layout')
@section('content')
    <div class="container">
        <div class="row"> 
 
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h2>Reservations Management</h2>
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
                        <a href="{{ url('/reservations/create') }}" class="btn btn-success btn-sm" title="Add New Reservation">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>
                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>IDClient</th>
                                        <th>Date</th>
                                        <th>Table_Num</th>
                                        <th>Guests_Num</th>
                                        <th>Status</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($reservations as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $item->idClient }}</td>
                                        <td>{{ $item->date }}</td>
                                        <td>{{ $item->NumTable }}</td>
                                        <td>{{ $item->GuestsNumber}}</td>
                                        <td>{{ $item->Status}}</td>
                                        <td>
                                        <a href="{{ url('/reservations/' . $item->idReservation) }}" title="View Reservation"><button class="btn btn-info btn-sm"><i class="fa fa-eye" aria-hidden="true"></i> View</button></a>
                                            <a href="{{ url('/reservations/' . $item->idReservation . '/edit') }}" title="Edit Reservation"><button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button></a>
 
                                            <form method="post" action="{{ url('/reservations/' . $item->idReservation) }}" accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Reservation" onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
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