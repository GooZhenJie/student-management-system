<?php

namespace App\Traits;

trait Enum
{
    public static function GetKeyValuePair()
    {
        return array_map(function ($case) {
            return [
                'key' => $case->name,
                'value' => $case->value,
            ];
        }, static::cases());
    }
}
