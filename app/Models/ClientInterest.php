<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientInterest extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'interest_id'];

    protected $with= ['interest'];

    public function client(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function interest(){
        return $this->hasOne(Interest::class, 'id', 'interest_id');
    }
}
