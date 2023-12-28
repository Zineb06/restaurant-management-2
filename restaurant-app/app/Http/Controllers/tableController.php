<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\table;
use Illuminate\Support\Facades\Validator;

class tableController extends Controller
{
    public function index()
    {
        $tables = table::all();

        return response()->json([
            'tables' => $tables
        ], 200);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'idTable'=>'required',
            'location' => 'required',
            'guests' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create Table
            Table::create([
                'idTable' =>$request->idTable,
                'location' => $request->location,
                'guests' => $request->guests,
            ]);

            return response()->json([
                'message' => 'Table successfully created.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went really wrong!'
            ], 500);
        }
    }

    public function show($id)
    {
        $table = Table::find($id);
        if (!$table) {
            return response()->json([
                'message' => 'Table Not Found.'
            ], 404);
        }

        return response()->json([
            'table' => $table
        ], 200);
    }
    public function update(Request $request, $id)
{
    try {
        $table = Table::find($id);
        if (!$table) {
            return response()->json([
                'message' => 'Table Not Found.'
            ], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            //'idTable' => 'required',
            'location' => 'required',
            'guests' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        //$table->idTable = $request->idTable;
        $table->location = $request->location;
        $table->guests = $request->guests;

        $table->save();

        return response()->json([
            'message' => 'Table successfully updated.'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Something went really wrong!'
        ], 500);
    }
}

    public function destroy($id)
    {
        $table = table::find($id);
        $table->delete();

        return response()->json([
            'message' => 'Table successfully deleted.'
        ], 200);
    }
}