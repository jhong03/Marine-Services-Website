<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                Select::make('icon')
                    ->label('Icon')
                    ->options([
                        'wrench' => 'Wrench (engine / repair)',
                        'droplets' => 'Droplets (cleaning / antifoul)',
                        'gauge' => 'Gauge (electronics)',
                        'ship' => 'Ship (rigging / vessel)',
                        'paint' => 'Paint bucket (finishing)',
                        'lifebuoy' => 'Life buoy (safety)',
                        'anchor' => 'Anchor',
                        'shield' => 'Shield (insured)',
                        'compass' => 'Compass',
                        'waves' => 'Waves',
                    ])
                    ->native(false)
                    ->searchable()
                    ->helperText('Icon shown on the public site.'),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->helperText('Lower numbers appear first.'),
                Toggle::make('is_published')
                    ->default(true)
                    ->helperText('Only published items show on the website.'),
            ]);
    }
}
