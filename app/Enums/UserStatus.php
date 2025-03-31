<?php

namespace App\Enums;

use App\Traits\Enum;

enum UserStatus: string
{
    use Enum;

    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
