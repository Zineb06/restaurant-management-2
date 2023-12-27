<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

use App\Models\client;
use Illuminate\View\View;
use Illuminate\Support\Facades\Hash;



class clientController extends Controller
{
    public function index(): JsonResponse
    {
        $client = client::all();
        return response()->json(['client' => $client]);
    }

    public function destroy($id)
    {
        // Trouver le client par son ID
        $client = Client::find($id);

        // Vérifier si le client existe
        
        // Supprimer le client
        $client->delete();

        // Retourner une réponse, rediriger ou effectuer toute autre logique nécessaire
        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function store(Request $request)
{
    
        $input = $request->all();
        $client = Client::create($input);
        //$imageUrl = 'storage/images/' . $imageName; // $imageName est le nom de votre fichier image

        return response()->json(['message' => 'Image uploaded successfully']);}
            

      
    public function update(Request $request, $id)
    {
        
            $client = Client::findOrFail($id);
            $client->update($request->all());

            // Retourner une réponse JSON
        if ($request->wantsJson()){
            return response()->json([
                'message' => 'Client mis à jour avec succès',
                'client' => $client,
            ], 200);
        } }
        public function show($id)
        {
            $client = Client::find($id);

            if (!$client) {
                return response()->json(['message' => 'Client not found'], 404);
            }

            return response()->json(['client' => $client], 200);
        }




    
    /*public function index() : View 
    {
        $client = client::all();
        return view('clients.index')-> with ('client', $client);
    }

    public function create(): View
    {
        return view('clients.create');
    }*/
  
    /*public function store(Request $request): RedirectResponse
    {
        $input = $request->all();
        // $input['password'] = Hash::make($request->password);
        Client::create($input);
        return redirect('clients')->with('flash_message', 'Client Addedd!');
    }*/
    /*public function show(string $id): View
    {
        $client = Client::find($id);
        return view('clients.show')->with('client', $client);
    }
    public function edit(string $id): View
    {
        $client = Client::find($id);
        return view('clients.edit')->with('client', $client);
    }*/
    /*public function update(Request $request, string $id): RedirectResponse
    {
        $client = Client::find($id);
        $input = $request->all();
        $client->update($input);
        return redirect('clients')->with('flash_message', 'client Updated!');  
    }*/
    
    /*public function destroy(string $id): RedirectResponse
    {
        Client::destroy($id);
        return redirect('clients')->with('flash_message', 'Client deleted!'); 
    }*/
}