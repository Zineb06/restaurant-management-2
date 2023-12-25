<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\client;
use Illuminate\View\View;
use Illuminate\Support\Facades\Hash;


class clientController extends Controller
{
    public function index() : View 
    {
        $client = client::all();
        return view('clients.index')-> with ('client', $client);
    }

    public function create(): View
    {
        return view('clients.create');
    }
  
    public function store(Request $request): RedirectResponse
    {
        $input = $request->all();
        // $input['password'] = Hash::make($request->password);
        Client::create($input);
        return redirect('clients')->with('add_message', 'Client Addedd!');
    }
    public function show(string $id): View
    {
        $client = Client::find($id);
        return view('clients.show')->with('client', $client);
    }
    public function edit(string $id): View
    {
        $client = Client::find($id);
        return view('clients.edit')->with('client', $client);
    }
    public function update(Request $request, string $id): RedirectResponse
    {
        $client = Client::find($id);
        $input = $request->all();
        $client->update($input);
        return redirect('clients')->with('update_message', 'client Updated!');  
    }
    
    public function destroy(string $id): RedirectResponse
    {
        client::destroy($id);
        return redirect('clients')->with('delete_message', 'Client deleted!'); 
    }
}
