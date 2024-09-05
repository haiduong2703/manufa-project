using Manufa.DTO;
using System.Collections.Generic;

namespace Manufa.Interface
{
    public interface IBodySizeComponentServices
    {
        BodySizeResponeDTO CreateBodySize(BodySizeDTO body);
        BodySizeResponeDTO UpdateBodySize(BodySizeDTO body);
        BodySizeResponeDTO DeleteBodySize(int id);
        List<BodySizeDTO> GetAllBodySize(int pageNumber, int pageSize);
        List<ComponentTypeDTOSelect> GetAllComponentType();

        BodySizeDTO GetBodySizeById(int id);
    }
}
