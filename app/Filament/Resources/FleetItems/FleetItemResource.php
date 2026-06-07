<?php

namespace App\Filament\Resources\FleetItems;

use App\Filament\Resources\FleetItems\Pages\CreateFleetItem;
use App\Filament\Resources\FleetItems\Pages\EditFleetItem;
use App\Filament\Resources\FleetItems\Pages\ListFleetItems;
use App\Filament\Resources\FleetItems\Schemas\FleetItemForm;
use App\Filament\Resources\FleetItems\Tables\FleetItemsTable;
use App\Models\FleetItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FleetItemResource extends Resource
{
    protected static ?string $model = FleetItem::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?string $navigationLabel = 'Fleet & Equipment';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return FleetItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FleetItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFleetItems::route('/'),
            'create' => CreateFleetItem::route('/create'),
            'edit' => EditFleetItem::route('/{record}/edit'),
        ];
    }
}
