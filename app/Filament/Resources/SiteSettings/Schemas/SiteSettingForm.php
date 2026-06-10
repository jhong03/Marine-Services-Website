<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('company_name'),
                TextInput::make('tagline'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('address'),
                TextInput::make('hours')
                    ->helperText('e.g. Mon–Sat, 8am–6pm'),
                TextInput::make('facebook_url')
                    ->label('Facebook URL')
                    ->url(),
                TextInput::make('instagram_url')
                    ->label('Instagram URL')
                    ->url(),
                TextInput::make('hero_heading')
                    ->label('Homepage hero heading')
                    ->columnSpanFull(),
                Textarea::make('hero_subtext')
                    ->label('Homepage hero subtext')
                    ->columnSpanFull(),
                Textarea::make('cinematic_capability')
                    ->label('Homepage cinematic — capability line')
                    ->helperText('Shown ~⅔ through the scroll sequence, e.g. “Servicing, repairs & maintenance — done properly.”')
                    ->columnSpanFull(),
                TextInput::make('cinematic_handoff')
                    ->label('Homepage cinematic — hand-off line')
                    ->helperText('The closing line as the sequence releases into the page, e.g. “Welcome aboard.”')
                    ->columnSpanFull(),
                Textarea::make('about_story')
                    ->label('About page story')
                    ->rows(6)
                    ->columnSpanFull(),
                Repeater::make('stats')
                    ->label('Stats (shown on Home & About)')
                    ->schema([
                        TextInput::make('value')
                            ->required()
                            ->placeholder('20+'),
                        TextInput::make('label')
                            ->required()
                            ->placeholder('Years on the water'),
                    ])
                    ->columns(2)
                    ->reorderable()
                    ->collapsible()
                    ->columnSpanFull(),
                Repeater::make('core_values')
                    ->label('Values (About page)')
                    ->schema([
                        TextInput::make('title')
                            ->required(),
                        Textarea::make('description')
                            ->required(),
                    ])
                    ->reorderable()
                    ->collapsible()
                    ->columnSpanFull(),
            ]);
    }
}
