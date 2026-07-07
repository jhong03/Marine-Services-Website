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
                Select::make('category')
                    ->required()
                    ->options([
                        'industrial' => 'Industrial Services',
                        'marine' => 'Marine Services',
                        'spare_parts' => 'Spare Parts',
                    ])
                    ->native(false)
                    ->default('industrial'),
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                Select::make('icon')
                    ->label('Icon')
                    ->options([
                        'cog' => 'Cog (mechanical)',
                        'wrench' => 'Wrench (repair)',
                        'hammer' => 'Hammer (fabrication)',
                        'gauge' => 'Gauge (instrumentation)',
                        'zap' => 'Bolt (electrical)',
                        'factory' => 'Factory (plant)',
                        'hardhat' => 'Hard hat (site works)',
                        'truck' => 'Truck (logistics)',
                        'package' => 'Package (spare parts)',
                        'boxes' => 'Boxes (inventory)',
                        'shield' => 'Shield (safety / insured)',
                        'droplets' => 'Droplets (cleaning / coatings)',
                        'ship' => 'Ship (marine / vessel)',
                        'anchor' => 'Anchor (marine)',
                        'lifebuoy' => 'Life buoy (marine safety)',
                        'waves' => 'Waves (marine)',
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
