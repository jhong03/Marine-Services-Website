<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FleetItem extends Model
{
    protected $fillable = [
        'name',
        'spec',
        'description',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }
}
