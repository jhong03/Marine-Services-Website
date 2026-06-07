<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'company_name',
        'tagline',
        'email',
        'phone',
        'address',
        'hours',
        'facebook_url',
        'instagram_url',
        'hero_heading',
        'hero_subtext',
        'about_story',
        'stats',
        'core_values',
    ];

    protected function casts(): array
    {
        return [
            'stats' => 'array',
            'core_values' => 'array',
        ];
    }

    /**
     * Get the single settings row, creating it if needed.
     */
    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
