<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\reservation;
use Illuminate\View\View;
use App\Models\table;
use App\Models\client;

class reservationController extends Controller
{
    public function index() : View 
    {
        $reservations = reservation::all();
        $tables = table::all();
        // return response()->json($reservations);
        return view('reservations.index')-> with('reservations', $reservations)->with('tables', $tables);
    }

    public function create(): View
    {
        $tables = table::all();
        $clients = client::all();
        return view('reservations.create')->with('tables', $tables)->with('clients', $clients);
    }
  
    public function store(Request $request): RedirectResponse
    {
        $input = $request->all();
        Reservation::create($input);
        // return response()->json("Reservation Addedd!");
        return redirect('reservations')->with('add_message', 'Reservation Addedd!');
    }
    public function show(string $id): View
    {
        $reservation = Reservation::find($id);
        return view('reservations.show')->with('reservations', $reservation);
    }
    public function edit(string $id): View
    {
        $tables = table::all();
        $clients = client::all();
        $reservation = Reservation::find($id);
        return view('reservations.edit')->with('reservation', $reservation)->with('tables', $tables)->with('clients', $clients);
    }
    public function update(Request $request, string $id): RedirectResponse
    {

        $reservation = Reservation::find($id);
        $input = $request->all();
        $reservation->save($input);
        // return response()->json("Reservation Updated!");
        return redirect('reservations')->with('update_message', 'Reservation Updated!');   
    }
    public function destroy(string $id): RedirectResponse
    {
        Reservation::destroy($id);
        return redirect('reservations')->with('delete_message', 'Reservation deleted!'); 
        // return response()->json("Reservation Deleted!");
    }
}
