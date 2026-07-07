<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/industrial', [PageController::class, 'industrial'])->name('industrial');
Route::get('/marine', [PageController::class, 'marine'])->name('marine');
Route::get('/spare-parts', [PageController::class, 'spareParts'])->name('spare-parts');
Route::get('/projects', [PageController::class, 'projects'])->name('projects');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

require __DIR__.'/settings.php';
