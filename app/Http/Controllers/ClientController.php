<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\ClientInterest;
use App\Models\Role;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            if(!Auth::user()){
                return response()->json(['message' => 'Something went wrong. Try again later!'], 409);
            }

            $limit = $request->limit ? $request->limit : 10;
            $sort = $request->sort ? $request->sort : 'created_at';
            $sort_dirc = $request->sort_dirc ? $request->sort_dirc : 'asc';

            $data = User::where('created_by', Auth::user()->id)->where( function($q) use ($request) {

            })->with(['interests'])->orderBy($sort, $sort_dirc)->paginate($limit);

            $response = (object)[
                "success" => true,
                "result" => $data,
                "message" => "Success"
            ];
            return response()->json($response, 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong. Try again later!'], 409);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $exist = User::where('email', $request->input('email'))->first();
            if(!$exist){
                $plainPassword = $this->generatePassword(12);
                
                $client_role = Role::where('name', 'Client')->first();
                $role = $client_role ? $client_role->id : 2;

                $user = new User;
                $user->first_name = $request->input('first_name');
                $user->last_name = $request->input('last_name');
                $user->email = $request->input('email');
                $user->password = app('hash')->make($plainPassword);
                $user->role_id = $role;
                $user->contact_no = $request->input('contact_no');
                if($request->input('birthdate')){
                    $user->birthdate = date('Y-m-d', strtotime($request->input('birthdate')));
                }
                $user->created_by = Auth::user()->id;
                $user->save();

                if($user){

                    foreach ($request->interest as $interest) {
                        ClientInterest::create([
                            'user_id' => $user->id,
                            'interest_id' => $interest,
                        ]);
                    }

                    $response = (object)[
                        "success" => true,
                        "result" => [
                            "user" => $user,
                        ],
                        "message" => 'New client has been successfully created',
                    ];
                }else{
                    return response()->json(['message' => 'Something went wrong. Try again later!'], 409);
                }
                
            }else{
                $response = (object)[
                    "message" => 'Provided email address is already exist.',
                ];
                return response()->json($response, 409);
            }

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $client_role = Role::where('name', 'Client')->first();
            $role = $client_role ? $client_role->id : 2;

            $user = User::where('id', $id)->where('role_id', $role)->first();
            if($user){
                $exist = User::where('email', $request->input('email'))->where('id', '!=', $user->id)->first();
                if(!$exist){
                    $user->first_name = $request->input('first_name');
                    $user->last_name = $request->input('last_name');
                    $user->email = $request->input('email');
                    $user->contact_no = $request->input('contact_no');
                    if($request->input('birthdate')){
                        $user->birthdate = date('Y-m-d', strtotime($request->input('birthdate')));
                    }
                    $user->save();

                    if($user){

                        ClientInterest::where('user_id', $user->id)->each(function ($item, $key) {
                            $item->delete();
                        });

                        if($request->interest){
                            foreach ($request->interest as $interest) {
                                ClientInterest::create([
                                    'user_id' => $user->id,
                                    'interest_id' => $interest,
                                ]);
                            }
                        }

                        $response = (object)[
                            "success" => true,
                            "result" => [
                                "user" => $user,
                            ],
                            "message" => 'Client data has been successfully updated',
                        ];
                    }else{
                        return response()->json(['message' => 'Something went wrong. Try again later!'], 409);
                    }
                }else{
                    $response = (object)[
                        "message" => 'Provided email address is already exist.',
                    ];
                    return response()->json($response, 409);
                }
                
            }else{
                $response = (object)[
                    "message" => "Can't find the client you are updating. Please try again!",
                ];
                return response()->json($response, 409);
            }

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $response = (object)[
                "success" => false,
                "message" => 'Something went wrong. Try again later!'
            ];
            $error_code = 201;

            $user = User::find($id);
            if($user){
                if($user->delete()){
                    $response = (object)[
                        "success" => true,
                        "message" => 'Client successfully deleted.'
                    ];
                    $error_code = 200;
                }
            }else{
                $response = (object)[
                    "success" => false,
                    "message" => "Can't find the client you are deleting. Please try again!"
                ];
                $error_code = 201;
            }
            return response()->json($response, $error_code);
        }catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong. Try again later!'], 409);
        }
    }

    function generatePassword($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
