<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blueprint::macro('trails', function ($precision = 0, $includeUpdate = true) {
            $this->timestamp('created_at', $precision)->nullable();
            $this->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');

            if ($includeUpdate) {
                $this->timestamp('updated_at', $precision)->nullable();
                $this->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            }
        });
    }
}
