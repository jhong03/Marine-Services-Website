<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'category',
        'title',
        'summary',
        'body',
        'client',
        'location',
        'year',
        'cover_image',
        'images',
        'video_url',
        'videos',
        'is_featured',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'videos' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }
}
