using Manufa.DTO;
using System.Collections.Generic;

namespace Manufa.Interface
{
    public interface IMaterialServices
    {
        List<MaterialDTO> GetAllMaterial();
    }
}
