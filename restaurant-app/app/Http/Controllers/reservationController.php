<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();

        return response()->json([
            'reservations' => $reservations
        ], 200);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'idClient' => 'required',
            'NumTable' => 'required',
            'date' => 'required',
            'time' => 'required',
            'GuestsNumber' => 'required|integer|min:1',
            'Status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create Reservation
            Reservation::create([
                'idClient' => $request->idClient,
                'NumTable' => $request->NumTable,
                'date' => $request->date,
                'time' => $request->time,
                'GuestsNumber' => $request->GuestsNumber,
                'Status' => $request->Status,
            ]);

            return response()->json([
                'message' => 'Reservation successfully created.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went really wrong!'
            ], 500);
        }
    }

    public function show($id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json([
                'message' => 'Reservation Not Found.'
            ], 404);
        }

        return response()->json([
            'reservation' => $reservation
        ], 200);
    }

    public function update(Request $request, $id)
{
    try {
        // Find the reservation by ID
        $reservation = Reservation::find($id);

        // Check if the reservation exists
        if (!$reservation) {
            return response()->json([
                'message' => 'Reservation Not Found.'
            ], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'idClient' => '',
            'NumTable' => '',
            'date' => '',
            'time' => '',
            'GuestsNumber' => '',
            'Status' => '',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update reservation properties with new values from the request
        $reservation->idClient = $request->idClient;
        $reservation->NumTable = $request->NumTable;
        $reservation->date = $request->date;
        $reservation->time = $request->time;
        $reservation->GuestsNumber = $request->GuestsNumber;
        $reservation->Status = $request->Status;

        // Save the updated reservation to the database
        $reservation->save();

        // Log success if the update is successful
        \Log::info('Reservation updated successfully');

        // Return a success response
       
    return response()->json(['message' => 'Reservation updated successfully']);
} catch (\Exception $e) {
    // Log l'erreur pour le débogage
    Log::error($e->getMessage());

    return response()->json(['error' => 'Failed to update reservation.'], 500);
}
}

    

    public function destroy($id)
    {
        $reservation = Reservation::find($id);
        $reservation->delete();

        return response()->json([
            'message' => 'Reservation successfully deleted.'
        ], 200);
    }
}