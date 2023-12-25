<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\table;
use Illuminate\View\View;

class tableController extends Controller
{
    public function index() : View 
    {
        $table = table::all();
        return view('tables.index')-> with ('table', $table);
    }

    public function create(): View
    {
        return view('tables.create');
    }
  
    public function store(Request $request): RedirectResponse
    {
        $input = $request->all();
        table::create($input);
        return redirect('tables')->with('add_message', 'Table Addedd!');

    }
    public function show(string $id): View
    {
        $table = table::find($id);
        return view('tables.show')->with('table', $table);
    }

    public function edit(string $id): View
    {
        $table = table::find($id);
        return view('tables.edit')->with('table', $table);
    }
    public function update(Request $request, string $id): RedirectResponse
    {
        $table = table::find($id);
        $input = $request->all();
        $table->update($input);
        return redirect('tables')->with('update_message', 'table Updated!');  
    }
    
    public function destroy(string $id): RedirectResponse
    {
        table::destroy($id);
        return redirect('tables')->with('delete_message', 'table deleted!'); 
    }

}