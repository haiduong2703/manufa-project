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
        BodySizeDTO GetBodySizeById(int id);
        


    }
}
