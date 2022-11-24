<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        try {
            $exist = User::where('email', $request->input('email'))->first();
            if(!$exist){
                $plainPassword = $request->input('password');

                $user = new User;
                $user->first_name = $request->input('first_name');
                $user->last_name = $request->input('last_name');
                $user->email = $request->input('email');
                $user->password = app('hash')->make($plainPassword);
                $user->role_id = 1;
                $user->contact_no = $request->input('contact_no');
                $user->birthdate = $request->input('birthdate');
                $user->save();
                $user->id;

                $credentials = $request->only(['email', 'password']);
                $token = Auth::attempt($credentials);

                $response = (object)[
                    "success" => true,
                    "result" => [
                        "user" => $request->user(),
                        "token" => $token,
                    ],
                    "message" => 'Congratulation, your account has been successfully created',
                ];
            }else{
                $response = (object)[
                    "message" => 'Provided email address is already exist.',
                ];
                return response()->json($response, 201);
            }

            return response()->json($response, 200);
            
            
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only(['email', 'password']);
            if (!$token = Auth::attempt($credentials)) {
                return response()->json(['message' => 'Your email and/or password is incorrect.'], 401);
            }

            $user = User::where('id', Auth::user()->id)->where('role_id', 1)->first();

            if($user){
                $response = (object)[
                    "success" => true,
                    "result" => [
                        "token" => $token,
                        "user" => $user,
                    ],
                    "message" => $user->first_name ? 'Welcome, ' . $user->first_name : 'Welcome back.',
                ];
            }else{
                return response()->json(['message' => 'Your email and/or password is incorrect.'], 401);
            }
    
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }
}
