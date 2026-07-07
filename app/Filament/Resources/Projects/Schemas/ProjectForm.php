<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
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
                TextInput::make('summary')
                    ->helperText('One-line summary shown on the project card.')
                    ->columnSpanFull(),
                Textarea::make('body')
                    ->label('Experience / write-up')
                    ->rows(5)
                    ->columnSpanFull(),
                TextInput::make('client'),
                TextInput::make('location'),
                TextInput::make('year')
                    ->helperText('e.g. 2024'),
                TextInput::make('cover_image')
                    ->label('Cover image path')
                    ->helperText('e.g. /media/projects/harbour-crane/cover.webp')
                    ->columnSpanFull(),
                TagsInput::make('images')
                    ->label('Gallery image paths')
                    ->helperText('Add each image path and press Enter.')
                    ->columnSpanFull(),
                TextInput::make('video_url')
                    ->label('Video link (YouTube / Vimeo)')
                    ->url()
                    ->columnSpanFull(),
                Toggle::make('is_featured')
                    ->label('Feature on homepage')
                    ->default(false),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->helperText('Lower numbers appear first.'),
                Toggle::make('is_published')
                    ->default(true)
                    ->helperText('Only published projects show on the website.'),
            ]);
    }
}
