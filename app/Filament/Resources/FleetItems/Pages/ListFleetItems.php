<?php

namespace App\Filament\Resources\FleetItems\Pages;

use App\Filament\Resources\FleetItems\FleetItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFleetItems extends ListRecords
{
    protected static string $resource = FleetItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
