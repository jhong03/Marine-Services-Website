<?php

namespace App\Filament\Resources\FleetItems\Pages;

use App\Filament\Resources\FleetItems\FleetItemResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditFleetItem extends EditRecord
{
    protected static string $resource = FleetItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
