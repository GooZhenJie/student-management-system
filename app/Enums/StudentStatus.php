<?php

namespace App\Enums;

use App\Traits\Enum;

enum StudentStatus: string
{
    use Enum;

    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case GRADUATED = 'graduated';
    case SUSPENDED = 'suspended';
}
